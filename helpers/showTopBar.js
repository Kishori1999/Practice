import { showCountdownTopBar } from "../src/components/CountDownTopBar";
import { FEATURE_SHOW_PROMOTION_TOPBAR } from "../constants";

export const showTopBar = showCountdownTopBar || FEATURE_SHOW_PROMOTION_TOPBAR;
