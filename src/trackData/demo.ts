/* eslint-disable @typescript-eslint/camelcase */

import { createHandler } from "./utils";
const commonData = {
  user_id: "",
  platform: "",
  page: "demo",
  perspective: "1",
};

const handler = createHandler(commonData, ["user_id", "platform", "page"]);

export const setCommonData = (options: { userId: string; isPC: boolean; isSelf: boolean }) => {
  commonData.user_id = options.userId;
  commonData.perspective = options.isSelf ? "1" : "2";
  commonData.platform = options.isPC ? "PC_WEB" : "H5";
  handler.ready();
};

/**
 * pv
 */
export const pv = () => {
  handler.pv("PAGE_MAIN", ["perspective"]);
};

/**
 * 「查看/更多ABC 」曝光
 */
export const showMoreABCAutoShow = (dom: HTMLElement) => {
  handler.do(dom, "PAGE_XXX_SHOW", {}, ["perspective"]);
};

export const showAndMoreORKClick = (isView: boolean) => {
  handler.do(
    "PAGE_ABC_CLICK",
    {
      first_area: "xxx",
      second_area: `${isView ? "view" : "more"}_abc`,
    },
    ["perspective"]
  );
};
