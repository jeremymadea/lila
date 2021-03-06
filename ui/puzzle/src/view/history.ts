import { h, thunk } from 'snabbdom';
import { VNode } from 'snabbdom/vnode';

import { Controller } from '../interfaces';

const historySize = 15;

function render(ctrl: Controller): VNode {
  const data = ctrl.getData();
  const slots: any[] = [];
  for (let i = 0; i < historySize; i++) slots[i] = data.user.recent[i] || null;
  return h('div.history', [
    h('div.timeline', slots.map(function(s) {
      if (s) return h('a', {
        class: {
          current: data.puzzle.id === s[0],
          win: s[1] >= 0,
          loss: s[1] < 0
        },
        attrs: { href: '/training/' + s[0] }
      }, s[1] > 0 ? '+' + s[1] : s[1]);
      return h('span', ' ');
    }))
  ]);
}

export default function(ctrl) {
  if (!ctrl.getData().user) return;
  return thunk('div.history', render, [ctrl, ctrl.recentHash()]);
};
