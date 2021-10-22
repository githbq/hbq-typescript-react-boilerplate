import memorize from "lodash/memoize";

export type DataItem = { value: string; label: string; children?: DataItem[] };

/**
 * 获取省市区级联数据，一次性返回所有数据
 * @returns [{label:'',value:'',children?:[]}]
 */
export const getAddressCascaderData = memorize(async (): Promise<DataItem[]> => {
  return [];
});
