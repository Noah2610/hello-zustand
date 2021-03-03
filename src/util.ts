export const runOneOf = (...funcs: (() => any)[]) =>
  funcs.length > 0 && funcs[Math.floor(Math.random() * funcs.length)]();
