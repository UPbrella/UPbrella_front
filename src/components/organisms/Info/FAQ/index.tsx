const FAQ = () => {
  return (
    <div className="px-120 pt-32 flex flex-col gap-4">
      <section className="bg-gray-100 rounded-20 p-32">
        <div className="font-semibold	text-18">
          <span className="mr-16 font-semibold text-18">Q</span>우산 대여와 반납 지점이 일치해야
          하나요?
        </div>
        <div className="flex mt-8">
          <span className="mr-16 font-semibold text-18">A</span>
          <div className="whitespace-pre-line">
            대여 지점과 반납 지점이 일치하지 않아도 됩니다!
            <br />
            이용자분의 현 위치에서 갖아 가까운 협업 지점에 대여, 반납해주시면 됩니다!
          </div>
        </div>
      </section>
      <section className="bg-gray-100 rounded-20 p-32">
        <div className="font-semibold	text-18">
          <span className="mr-16 font-semibold text-18">Q</span>영업시간은 어떻게 확인하나요?
        </div>
        <div className="flex mt-8">
          <span className="mr-16 font-semibold text-18">A</span>
          <div className="whitespace-pre-line">
            연세대학교 교내의 경우 24시간 동안 대여, 반납 가능하며
            <br />
            교외 지점(카페)의 경우 협업 지점의 '영업시간'내 방문해주셔야 대여, 반납이 가능합니다!
            <br />
            협업 지점의 영업시간은 '대여소 위치'페이지 내 해당 지점을 클릭하시면 확인하실 수
            있습니다!
          </div>
        </div>
      </section>
      <section className="bg-gray-100 rounded-20 p-32">
        <div className="font-semibold	text-18">
          <span className="mr-16 font-semibold text-18">Q</span>보증급 환급은 언제 이루어지나요?
        </div>
        <div className="flex mt-8">
          <span className="mr-16 font-semibold text-18">A</span>
          <div className="whitespace-pre-line">
            평균적으로 2~3일이 소요됩니다. 갑작스러운 우천 시 대여-반납량이 많아 조금 더 소요될 수
            있는 점 양해부탁드립니다!
            <br />
            더욱 편리하면서도 이용자분의 지갑과 환경 모두를 지킬 수 있는 업브렐라가 되도록
            노력하겠습니다.
            <br />
            즉각적인 문의가 필요하신 경우, UPbrella 카카오 플러스 친구로 문의주세요!(카카오
            통합검색창에 영문으로 'upbrella'검색)
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
