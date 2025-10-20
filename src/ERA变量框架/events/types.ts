'use strict';

export interface ActionsTaken {
  rollback: boolean;
  apply: boolean;
  resync: boolean;
  api: boolean;
  apiWrite: boolean;
}
