/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  CANVAS_CALLBACKS,
  clearExpect,
  expectChangeColor,
  expectNextLevel,
  expectNumberSlot,
  promptConfirmationSlot,
  promptOptionsSlot,
  promptTextSlot,
  testHomeParam,
  testUserParam,
  triggerTargetScene,
} from './action';

/**
 * Binds a function to the click listener of the given element.
 * @param {string} element HTML element ID
 * @param {Function} listener Callback that runs when element is clicked.
 */
function addClickListener(element, listener) {
  document.getElementById(element).addEventListener('click', listener);
}

/**
 * Binds every action button on the page to its corresponding click listener.
 */
function bindActionsToButtons() {
  addClickListener('btn-change-color', expectChangeColor);
  addClickListener('btn-next-level', expectNextLevel);
  addClickListener('btn-number-slot', expectNumberSlot);
  addClickListener('btn-home-param', testHomeParam);
  addClickListener('btn-user-param', testUserParam);
  addClickListener('btn-trigger-scene', triggerTargetScene);
  addClickListener('btn-prompt-text', promptTextSlot);
  addClickListener('btn-prompt-confirmation', promptConfirmationSlot);
  addClickListener('btn-prompt-options', promptOptionsSlot);
  addClickListener('btn-clear-expect', clearExpect);
}

window.addEventListener('load', () => {
  interactiveCanvas.ready(CANVAS_CALLBACKS);
  bindActionsToButtons();
});
