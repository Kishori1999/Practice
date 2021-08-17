import _ from 'lodash';
import Restifizer, {
  ActionOptions,
  Controller,
  ControllerOptions,
  Transport,
} from 'restifizer';
import * as Sentry from '@sentry/node';
import { ExtendedActionOptions, Scope } from '../domains/app';

const defaultAction: ExtendedActionOptions = {
  enabled: true,
};

/**
 * @apiDefine EmptySuccess
 * @apiSuccess (204) {empty} empty
 */

class BaseController<M, D, R> extends Restifizer.Controller<M, D, R, Scope<M>> {
  constructor(options: Partial<ControllerOptions>) {
    super(options || { actions: { default: defaultAction } });
  }

  static createAction(options: Partial<ActionOptions>): ActionOptions {
    return _.defaults(options, defaultAction);
  }

  static getName() {
    return this.name.charAt(0).toLowerCase() + this.name.replace('Controller', '').slice(1);
  }

  createScope(
    controller: Controller<M, D, R, Scope<M>>,
    transport: Transport<any>,
  ): Scope<M> {
    return super.createScope(controller, transport);
  }

  setResError(
    err, ...rest
  ) {
    const { httpStatus } = err;
    if (!httpStatus || httpStatus.code >= 500) {
      Sentry.captureException(err);
    }
    // @ts-ignore
    super.setResError(err, ...rest);
  }
}

export = module.exports = BaseController;
