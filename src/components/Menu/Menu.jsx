"use client";

import { AnimatePresence, motion } from "motion/react";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import { Navigation, SocialLinks } from "@/components";

import "./Menu.scss";

const MotionModalOverlay = motion.create(ModalOverlay);
const MotionModal = motion.create(Modal);

const menuTransition = { duration: 0.3, ease: "easeIn" };

export default function Menu({ isOpen, onClose }) {
  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <MotionModalOverlay
          isOpen
          onOpenChange={(open) => {
            if (!open) onClose();
          }}
          isDismissable
          shouldCloseOnInteractOutside={(element) =>
            !element.closest(".header__menu-open")
          }
          className="menu__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={menuTransition}
        >
          <MotionModal
            className="menu__modal"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={menuTransition}
            style={{ originY: 0 }}
          >
            <Dialog
              id="site-navigation-menu"
              aria-label="Site navigation"
              className="menu__dialog"
            >
              <Navigation
                animated
                className={`menu__navigation ${
                  isOpen ? "menu__navigation--open" : ""
                }`}
                direction="vertical"
                onNavigate={onClose}
              />

              <SocialLinks
                direction="horizontal"
                className="menu__social"
                onItemClick={onClose}
              />
            </Dialog>
          </MotionModal>
        </MotionModalOverlay>
      ) : null}
    </AnimatePresence>
  );
}
