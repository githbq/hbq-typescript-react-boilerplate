import memoize from 'lodash/memoize';
import { track, autoShow } from '@/utils/logger';

type Args = [string | HTMLElement, (string | any)?, (any | string[])?, string[]?];
type TrackOptions = {
  trackType: 'PV' | 'SHOW' | 'CUSTOM' | 'CLICK' | 'DRAG' | 'PULL' | 'LONG_PRESS' | 'SCALE';
  optionsType?: 'USER_OPERATION' | 'enter' | 'hide' | 'visible' | 'leave' | any;
};
export const createHandler = (commonData: any, usuallyKeys?: string[]) => {
  let tempParams: any = null;
  let resolve: any = () => {};
  const ready = new Promise((resolveFn: any) => {
    resolve = resolveFn;
  });
  const core = async (args: Args, trackOptions?: TrackOptions) => {
    const privateTempParams = tempParams;
    tempParams = null;
    await ready;
    let dom: HTMLElement | null = null;
    let eventName: string, params: any, dependencies: string[];
    if (args[0] instanceof HTMLElement) {
      dom = args[0];
      eventName = args[1] as string;
      params = (args[2] || {}) as any;
      dependencies = (args[3] || []) as string[];
    } else {
      eventName = args[0];
      params = (args[1] || {}) as any;
      dependencies = (args[2] || []) as string[];
    }
    if (!eventName) {
      return;
    }
    // 对埋点数据进行附加通常参数
    params = Object.assign(
      {},
      params,
      dependencies.concat(usuallyKeys || []).reduce(
        (source, key) => {
          source[key] = commonData[key];
          return source;
        },

        {}
      ),
      privateTempParams
    );
    if (dom) {
      autoShow(dom, eventName, params);
    } else {
      const newTrackOptions = trackOptions || { trackType: 'CLICK', optionsType: 'USER_OPERATION' };
      if (newTrackOptions.trackType === 'PV') {
        track(newTrackOptions.trackType, {
          page: eventName,
          params,
        });
      } else {
        track(newTrackOptions.trackType, {
          action: eventName,
          type: newTrackOptions.optionsType,
          params,
        });
      }
    }
  };

  const methods = {
    ready: resolve,
    setTempParams(params: any) {
      tempParams = params;
      return methods;
    },
    pv: memoize((actionName: string, dependencies?: string[]) => {
      const time_stamp = Date.now();
      const session_id = `${time_stamp}-${Math.floor(Math.random() * 100000)}-${actionName}`;
      core([actionName, { type: 'enter', time_stamp, session_id }, dependencies], {
        trackType: 'PV',
      });
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          core([actionName, { type: 'leave', time_stamp: Date.now(), session_id }, dependencies], {
            trackType: 'PV',
          });
        }
      });
    }),
    click: (...args: Args) => core(args, { trackType: 'CLICK', optionsType: 'USER_OPERATION' }),
    do: (...args: Args) => core(args),
  };
  return methods;
};
