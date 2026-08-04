"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { contactForm, getContactServiceOptions } from "@/data";
import { addToast } from "@/utils";
import {
  FORMSPREE_ENDPOINT,
  INITIAL_VALUES,
  REQUIRED_FIELDS,
} from "./contact.constants";
import { getFieldState } from "./contact.helpers";
import {
  getEmailError,
  getFieldError,
  getFullNameError,
  getMessageError,
  isEmailValid,
  isFullNameValid,
  isMessageValid,
  validateContactForm,
} from "./contact.validation";

// ==== function for getting the first invalid field ====
function getFirstInvalidField(values) {
  return REQUIRED_FIELDS.find((field) => getFieldError(field, values[field]));
}

// ==== function for getting the visible error ====
function getVisibleError(
  field,
  rawError,
  { touched, blurred, submitAttempted, submitErrorField },
) {
  if (!rawError) return "";

  if (submitAttempted) {
    return submitErrorField === field ? rawError : "";
  }

  if (touched[field] && blurred[field]) {
    return rawError;
  }

  return "";
}

// ==== hook for the contact form ====
export function useContactForm() {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [blurred, setBlurred] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitErrorField, setSubmitErrorField] = useState(null);

  // --- Service options ---
  const serviceOptions = useMemo(() => getContactServiceOptions(), []);

  // --- errors before validation ---
  const rawErrors = useMemo(
    () => ({
      fullName: getFullNameError(values.fullName),
      email: getEmailError(values.email),
      message: getMessageError(values.message),
    }),
    [values.fullName, values.email, values.message],
  );

  // --- errors after validation ---
  const errors = useMemo(() => {
    const context = { touched, blurred, submitAttempted, submitErrorField };

    return {
      fullName: getVisibleError("fullName", rawErrors.fullName, context),
      email: getVisibleError("email", rawErrors.email, context),
      message: getVisibleError("message", rawErrors.message, context),
    };
  }, [rawErrors, touched, blurred, submitAttempted, submitErrorField]);

  const valid = useMemo(
    () => ({
      fullName: isFullNameValid(values.fullName),
      email: isEmailValid(values.email),
      message: isMessageValid(values.message),
    }),
    [values.fullName, values.email, values.message],
  );

  // --- field states ---
  const fieldStates = useMemo(
    () => ({
      fullName: getFieldState({
        value: values.fullName,
        error: errors.fullName,
        isValid: valid.fullName,
        blurred: blurred.fullName,
      }),
      email: getFieldState({
        value: values.email,
        error: errors.email,
        isValid: valid.email,
        blurred: blurred.email,
      }),
      message: getFieldState({
        value: values.message,
        error: errors.message,
        isValid: valid.message,
        blurred: blurred.message,
      }),
    }),
    [values, errors, valid, blurred],
  );

  // --- useEffect for handling the submit error field ---
  useEffect(() => {
    if (!submitAttempted || !submitErrorField) return;

    const currentError = getFieldError(
      submitErrorField,
      values[submitErrorField],
    );
    if (currentError) return;

    const nextInvalid = getFirstInvalidField(values);
    setSubmitErrorField(nextInvalid);

    if (nextInvalid) {
      setBlurred((prev) => ({ ...prev, [nextInvalid]: true }));
    }
  }, [values, submitAttempted, submitErrorField]);

  // --- set field value ---
  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  // --- mark blurred ---
  const markBlurred = useCallback((name) => {
    setBlurred((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      setSubmitAttempted(true);

      const validationErrors = validateContactForm(values);
      const hasErrors = Object.values(validationErrors).some(Boolean);

      if (hasErrors) {
        const firstInvalid = getFirstInvalidField(values);
        setSubmitErrorField(firstInvalid);

        if (firstInvalid) {
          setBlurred((prev) => ({ ...prev, [firstInvalid]: true }));
          formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
        }

        return;
      }

      if (!FORMSPREE_ENDPOINT) {
        addToast(contactForm.notConfiguredMessage, "error");
        return;
      }

      setIsSending(true);

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: new FormData(formRef.current),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Formspree request failed");
        }

        formRef.current?.reset();
        setValues(INITIAL_VALUES);
        setTouched({});
        setBlurred({});
        setSubmitAttempted(false);
        setSubmitErrorField(null);
        addToast(contactForm.successMessage, "success");
      } catch {
        addToast(contactForm.errorMessage, "error");
      } finally {
        setIsSending(false);
      }
    },
    [values],
  );

  return {
    formRef,
    isSending,
    values,
    serviceOptions,
    errors,
    fieldStates,
    setFieldValue,
    markBlurred,
    handleSubmit,
  };
}
