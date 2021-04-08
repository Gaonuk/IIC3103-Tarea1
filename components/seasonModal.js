import Modal from "react-modal";
import { useState } from "react";

export default function SeasonModal({ seasonData }) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div class='ml-3 text-indigo-600 transform hover:-translate-y-0.5'>
      <button onClick={openModal}>{seasonData.number}</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        class="fixed z-10 inset-0 overflow-y-auto hidden"
        contentLabel="Season"
      >
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                  Season {seasonData.number}
                </h2>
                
              </div>
              <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-indigo-600 opacity-25"></div>
              <ul class="items-center pt-5">
                  {seasonData.episodes.map((episode) => (
                    <li class='pt-2'>
                      <span class='text-indigo-600 mr-4'>Episode {episode.episode}:</span>
                      <a href={`/episodes/${episode.episode_id}`}>
                        {episode.title}
                      </a>
                    </li>
                  ))}
                </ul>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={closeModal}
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
