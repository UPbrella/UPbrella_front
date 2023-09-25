import {
  ContentProps,
  DetailedNumberContentProps,
  DetailedTitleProps,
} from "@/components/pages/tos";

const PrivacyPolicy = () => {
  const titles: string[] = [
    "1. 개인정보 수집 항목",
    "2. 개인정보 처리 목적",
    "3. 개인정보의 처리 및 보존 기간",
    "4. 개인정보의 파기",
    "5. 기타",
  ];
  const detailedNumberContents: {
    [key: number]: string[];
  } = {
    1: ["가. 회원 가입에 따른 회원 정보", "나. 우산 보증금 환급 처리를 위한 정보"],
    2: [
      "이용자가 제공한 모든 정보는 다음의 목적에 필요한 용도 이외로는 사용되지 않으며, 이용 목적이 변경될 시에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.",
    ],
    3: ["가. 회원 정보", "나. 우산 보증금 환급 처리를 위한 정보"],
    4: [
      "원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.",
      "이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라일정 기간(보존 및 보존 기간 참조) 저장된 후 파기되어 집니다. 별도 DB로 옮겨진 개인정보는 본 개인정보처리 방침 상에서의 고지된 목적 이외의 다른 목적으로 이용되지 않습니다.",
      "보존 기간의 경과, 정보주체의 파기 요구가 있을 시 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.",
      "이용자는 언제든지 정보 파기를 요구할 수 있습니다. 정보 파기를 원하시거나 문의사항이 있으신 경우 업브렐라 이메일 (upbrella.project@gmail.com)로 문의주시면 조치하겠습니다.",
    ],
    5: [
      "개인정보 처리방침 내용 추가, 삭제 및 수정이 있을 시에는 변경사항의 시행일 7일 전부터 홈페이지를 통해 고지할 것입니다.",
    ],
  };
  const detailedCircleContents: {
    [key: number]: { [key: number]: string[] };
  } = {
    1: {
      1: [
        "필수 기입 정보 : 이름, 전화번호, 카카오 고유 ID 개인식별정보(숫자의 형태)",
        "선택 기입 정보 : 보증금 환급을 위한 은행, 계좌번호",
      ],
      2: ["필수 기입 정보 : ‘반납폼’에서 이용자에 의해 기입된 보증금 환급을 위한 은행, 계좌번호"],
    },
    2: {
      1: [
        "회원 가입의사 확인, 서비스 이용을 위한 본인 식별 인증, 회원자격의 유지 및 관리",
        "대여, 반납 이력 조회에 따른 반납 처리 및 보증금 정산",
      ],
    },
    3: {
      1: [
        "필수 보존 항목₁ : 이름, 전화번호, 카카오 고유 ID 개인식별정보(숫자의 형태),",
        "이용자의 선택적 기입에 따른 보존 항목₂ : 보증금 환급을 위한 은행, 계좌번호",
        "보존 기간 : 수집일로부터 회원 탈퇴 시까지 (2년마다 재동의가 요구됨, 별도의 철회 요청이 있을 경우 즉시 폐기₃)",
        "보존 근거 : 정보주체 동의",
      ],
      2: [
        "보존 항목 : ‘반납폼’에서 이용자에 의해 기입된 보증금 환급을 위한 은행, 계좌번호",
        "보존 기간 : 수집 및 이용목적(보증금 환급)이 달성된 경우 해당 정보를 지체 없이 파기",
        "보존 근거 : 정보주체 동의",
      ],
    },
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-start w-640 px-20 py-24">
        <div className="mb-24 text-gray-700 text-24 font-bold leading-32">
          업브렐라 개인정보처리방침
        </div>
        <div className="mb-40 text-gray-700 text-16 font-normal leading-24">
          업브렐라는 「개인정보보호법」 관련 법령을 준수하고 있습니다. 업브렐라는 이용자의
          개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가
          취해지고 있는지 고지합니다. 이용자가 제공한 모든 정보는 아래의 목적에 필요한 용도 이외로는
          사용되지 않으며, 이용 목적이 변경될 시에는 별도의 동의를 받는 등 필요한 조치를 이행할
          예정입니다.
        </div>
        <div>
          {titles.map((title, index) => {
            const num: number = index + 1;
            const contents = detailedNumberContents[num];
            const circleContents = detailedCircleContents[num];
            if (num === 3) {
              return (
                <Content
                  key={index}
                  title={title}
                  contents={contents}
                  circleContents={circleContents}
                  smallContents={[
                    "₁ 필수 보존 항목의 변경이 필요할 경우, 회원 탈퇴 후 재가입 필요.",
                    "₂ 이용자의 선택적 기입에 따른 보존 항목(보증금 환급을 위한 은행, 계좌번호)의 경우, 이용자는 언제든 [MYPAGE]-[개인정보 조회] 페이지에서 정보를 기입, 삭제, 수정할 수 있다.",
                    "₃ 단, 업브렐라 이용약관 제 9조(회원자격 정지 및 해지)의 6항과 10항에 따라 업브렐라의 결정에 의한 회원의 회원자격 강제 해지 시 카카오 고유 ID 개인식별정보(회원정보) 는 회원의 소셜 로그인을 방지를 위해 1년간 보관됩니다.",
                  ]}
                />
              );
            } else {
              return (
                <Content
                  key={index}
                  title={title}
                  contents={contents}
                  circleContents={circleContents}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;

const Content = ({ title, contents, circleContents, smallContents }: ContentProps) => {
  return (
    <div className="mb-40">
      <DetailedTitle title={title} />
      <div>
        {contents.map((content, index) => {
          if (smallContents && index === 0) {
            return (
              <DetailedNumberContent
                key={index}
                number={index + 1}
                content={content}
                circleContents={circleContents ? circleContents[index + 1] : null}
                smallContents={smallContents}
              />
            );
          } else {
            return (
              <DetailedNumberContent
                key={index}
                number={index + 1}
                content={content}
                circleContents={circleContents ? circleContents[index + 1] : null}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
const DetailedTitle = ({ title }: DetailedTitleProps) => {
  return <div className="mb-8 text-gray-700 text-16 font-semibold leading-24">{title}</div>;
};

const DetailedNumberContent = ({
  content,
  circleContents,
  smallContents,
}: DetailedNumberContentProps) => {
  return (
    <div className="flex mb-4">
      <div className="text-gray-700 text-16 font-normal leading-24">
        <div className="mb-4">{content}</div>
        {circleContents
          ? circleContents.map((content, index) => {
              return (
                <div className="flex mb-4" key={index}>
                  <div className="ml-5 mr-10"> • </div>
                  <div className="mb-4">{content}</div>
                </div>
              );
            })
          : null}
        {smallContents
          ? smallContents.map((content, index) => {
              return (
                <div className="flex mb-4" key={index}>
                  <div className="ml-5 mr-10"> </div>
                  <div className="mb-4">{content}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
