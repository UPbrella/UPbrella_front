export type TStore = {
  title: string;
  category: string[];
};

const Store = ({ title, category }: TStore) => {
  return (
    <div className="flex mb-12">
      <div className="flex flex-col items-center">
        <img
          src="https://m.godshop.co.kr/web/product/big/202011/b472f812f7bb5cdaa048439de5f0360f.jpg"
          alt="Image"
          className="w-248 h-174 rounded-12"
        />

        <div className="text-gray-700 text-16 font-semibold mt-12">{title}</div>
        <div className="text-gray-600 text-12">{category.join(", ")}</div>
      </div>
    </div>
  );
};

export default Store;
