import { Mixpanel } from "mixpanel-react-native";

const trackAutomaticEvents = true;
const mixpanel = new Mixpanel(
  "a778e08ce13698c58cac71b5394498bb",
  trackAutomaticEvents
);

export default mixpanel;
