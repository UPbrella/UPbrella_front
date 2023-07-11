// 라우트 type
export type TRoute = {
  name: string;
  path: string;
  component: () => JSX.Element;
};
