"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { HashLoader, ClipLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
        >
          <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center
          "
          >
            <Dialog.Panel>
              <div className="bg-white rounded-lg px-4 py-3 shadow-md drop-shadow-xl">
                <ClipLoader size={45} color="#F43F5E" />
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
