import { GAP } from "@/constants/Dimensions";
import { default as RNToast, ToastOptions } from "react-native-root-toast";

export enum ToastType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
}

const show = (message: string, type?: ToastType, options?: ToastOptions) => {
  let _options: ToastOptions = {};
  switch (type) {
    case ToastType.ERROR:
      _options = {
        textStyle: {
          fontSize: GAP,
          color: "#ffffff",
        },
        containerStyle: {
          paddingHorizontal: GAP,
          borderRadius: GAP * 2,
          backgroundColor: "#7C444F",
        },
        ...options,
      };
      break;
    case ToastType.SUCCESS:
      _options = {
        textStyle: {
          fontSize: GAP,
          color: "#ffffff",
        },
        containerStyle: {
          paddingHorizontal: GAP,
          borderRadius: GAP * 2,
          backgroundColor: "#A5B68D",
        },

        ...options,
      };
      break;
    case ToastType.INFO:
      _options = {
        textStyle: {
          fontSize: GAP,
          color: "#ffffff",
        },
        containerStyle: {
          paddingHorizontal: GAP,
          borderRadius: GAP * 2,
          backgroundColor: "#789DBC",
        },
        ...options,
      };
      break;
    default:
      _options = {
        textStyle: {
          fontSize: GAP,
          color: "#ffffff",
        },
        containerStyle: {
          paddingHorizontal: GAP,
          borderRadius: GAP * 2,
          backgroundColor: "#212121",
        },
        ...options,
      };
  }
  return RNToast.show(message, {
    duration: RNToast.durations.LONG,
    position: RNToast.positions.BOTTOM,
    shadow: true,
    animation: true,
    ..._options,
  });
};

const Toast = {
  show,
};

export default Toast;
