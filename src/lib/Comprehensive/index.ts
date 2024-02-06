import unstable_render from "./unstable_render";
import unstable_useStatefulComphrensive from "./unstable_useStatefulComprehensive";

export function Comprehensive() {
  const statePayload = unstable_useStatefulComphrensive();

  return unstable_render(statePayload);
}
