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
import {logEvent} from './log-event';
import {changeBackground} from './change-background';

export const CANVAS_CALLBACKS = {
  onUpdate(data) {
    logEvent('Update:' + JSON.stringify(data));
  },
  onInputStatusChanged(data) {
    logEvent('Mic mode change: ' + data);
  },
  onTtsMark(markName) {
    logEvent('[tts]: ' + markName);
  },
};

/** Clears expections */
export function clearExpect() {
  interactiveCanvas.clearExpectations();
  logEvent('cleared expectation');
  interactiveCanvas.registerNoMatch(function() {
    logEvent('received NO_MATCH');
  });

  // Expect an non-exit intent.
  const unusedIntent =
      interactiveCanvas.createIntentHandler('unused', () => {
        console.log('unused intent');
      });
  interactiveCanvas.expect(unusedIntent);
}

/** *** On Button Clicks *******/

/** trigger a screne */
export async function triggerTargetScene() {
  logEvent('[click] triggerScene');
  try {
    await interactiveCanvas.triggerScene('TargetScene');
    logEvent('triggerScene requested.');
  } catch (e) {
    logEvent(`triggerScene failed: ${e.message}`);
  }
}

/** Expects a customIntent change_color */
export function expectChangeColor() {
  logEvent('[click] expectChangeColor');
  const changeColorIntent =
      interactiveCanvas.createIntentHandler('change_color', (matchedIntent) => {
        const color = matchedIntent.getIntentArg('color');
        if (typeof color === 'string') {
          logEvent('matched change_color intent with color: ' + color);
          changeBackground(color);
          interactiveCanvas.outputTts('Okay, ' + color, true);
        } else {
          logEvent('matched change_color without color');
          interactiveCanvas.outputTts('Okay', true);
        }
      });
  interactiveCanvas.expect(changeColorIntent);
  interactiveCanvas.outputTts('Say change color to green', true);
}

/** Expects a customIntent next_level */
export function expectNextLevel() {
  logEvent('[click] expectNextLevel');
  const nextLevelIntent =
      interactiveCanvas.createIntentHandler('next_level', () => {
        logEvent('going to next level');
      });
  interactiveCanvas.expect(nextLevelIntent);
}

/** Expects a number slot */
export function expectNumberSlot() {
  logEvent('[click] expectNumberSlot');
  const triggerHints = {associatedWords: ['favorite number', 'number']};
  const numberSlot = interactiveCanvas.createNumberSlot((number) => {
    logEvent('got number: ' + number);
  }, triggerHints);
  interactiveCanvas.expect(numberSlot);
  interactiveCanvas.outputTts('Say a number', true);
}

/** Tests Home Storage */
export async function testHomeParam() {
  logEvent('[click] testHomeParam');
  const homeKey = 'homeTestKey';
  interactiveCanvas.getHomeParam(homeKey)
      .catch((e) => {
        if (e.message.includes('Key not found')) {
          return 'empty, ignored.';
        }
      })
      .then((value) => {
        logEvent('oldValue: ' + value);
        const newValue = getCurrentTimeString();
        logEvent('Updating to: ' + newValue);
        return interactiveCanvas.setHomeParam(homeKey, newValue);
      })
      .then((result) => {
        logEvent('Successfully updated home param');
        return interactiveCanvas.getHomeParam(homeKey);
      })
      .then((value) => {
        logEvent('new value: ' + value);
      })
      .catch((e) => {
        logEvent('Error:' + e);
      });
}

/** Tests User Storage */
export function testUserParam() {
  logEvent('[click] testUserParam');
  const userKey = 'userTestKey';
  interactiveCanvas.getUserParam(userKey)
      .catch((e) => {
        if (e.message.includes('Key not found')) {
          return 'empty, ignored.';
        }
      })
      .then((value) => {
        logEvent('oldValue: ' + value);
        const newValue = getCurrentTimeString();
        logEvent('Updating to: ' + newValue);
        return interactiveCanvas.setUserParam(userKey, newValue);
      })
      .then((result) => {
        logEvent('Successfully updated user param');
        return interactiveCanvas.getUserParam(userKey);
      })
      .then((value) => {
        logEvent('new value: ' + value);
      })
      .catch((e) => {
        logEvent('Error:' + e);
      });
}

/** Prompts a text slot */
export function promptTextSlot() {
  logEvent('[click] promptTextSlot');
  const textSlot = interactiveCanvas.createTextSlot((text) => {
    logEvent('[slot] text: ' + text);
  }, {associatedWords: ['name', 'first name']});
  interactiveCanvas.prompt('Which city are you in?', textSlot)
      .catch((error) => console.error(error.message));
}

/** Prompts a text slot */
export function promptConfirmationSlot() {
  logEvent('[click] promptConfirmationSlot');
  const confirmationSlot =
      interactiveCanvas.createConfirmationSlot((confirmation) => {
        logEvent('[slot] confirmation: ' + confirmation);
      }, {associatedWords: ['yes', 'no']});
  interactiveCanvas.prompt('Do you want to go outside?', confirmationSlot)
      .catch((error) => logEvent(error.message));
}

/** Prompts a text slot */
export function promptOptionsSlot() {
  logEvent('[click] promptOptionsSlot');
  const options = [
    {key: 'credit_card', synonyms: ['credit card']},
    {key: 'paypal', synonyms: ['paypal']},
    {key: 'bank_account', synonyms: ['bank account']},
  ];
  const optionsSlot =
      interactiveCanvas.createOptionsSlot(options, (selectedOption) => {
        logEvent('[slot] payment: ' + selectedOption);
      }, {associatedWords: ['payment']});
  interactiveCanvas
      .prompt(
          'Which payment method do you want to use? ' +
              'Credit card, PayPal or Bank Account?',
          optionsSlot)
      .catch((error) => logEvent(error.message));
}
