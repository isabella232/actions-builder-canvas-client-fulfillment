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
import {getCurrentTimeString} from './get-current-time-string';

/**
 * Adds a log entery to the log area.
 * @param {string} text
 */
export function logEvent(text) {
  const logger = document.getElementById('event-log');
  const node = document.createElement('p');
  text = getCurrentTimeString() + ': ' + text;
  const textnode = document.createTextNode(text);
  node.appendChild(textnode);
  logger.appendChild(node);
  logger.scrollTop = logger.scrollHeight - logger.clientHeight;
}
