import type { PartialDeep } from 'type-fest';
import content from './era_var_operation_rule.txt?raw';

export const ERA_VAR_OPERATION_RULE_ENTRY_NAME = 'ERA 变量操作规则';

export const eraVarOperationRuleEntry: PartialDeep<WorldbookEntry> = {
  name: ERA_VAR_OPERATION_RULE_ENTRY_NAME,
  content,
  enabled: true,
  strategy: {
    type: 'constant',
    keys: [],
    keys_secondary: {
      logic: 'and_any',
      keys: [],
    },
    scan_depth: 'same_as_global',
  },
  position: {
    type: 'at_depth',
    role: 'system',
    depth: 0,
    order: 9999,
  },
  probability: 100,
  recursion: {
    prevent_incoming: false,
    prevent_outgoing: false,
    delay_until: null,
  },
  effect: {
    sticky: null,
    cooldown: null,
    delay: null,
  },
};
