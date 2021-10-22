import eventCenter from "@/utils/event";

export const responseResolver = (response: any) => {
  try {
    if (response.code !== 0) {
      response.message && eventCenter.emit("ajax-request-error", response.message);
      return false;
    } else if (response.message && response.message !== "ok") {
      eventCenter.emit("ajax-request-error", response.message);
    }
    return true;
  } catch (e) {
    return false;
  }
};
