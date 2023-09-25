import ErrorComponent from "@/components/molecules/ErrorComponent";

const ForbiddenPage = () => {
  return (
    <ErrorComponent
      error="죄송합니다. 페이지를 찾을 수 없어요:("
      subError="접근 권한이 없습니다."
    />
  );
};

export default ForbiddenPage;
