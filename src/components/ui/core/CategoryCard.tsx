import { ICategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div className="bg-white bg-opacity-50 border-2 border-white rounded-2xl text-center p-6 h-44">
      {category?.icon ? (
        <Image
          src={category.icon}
          width={100}
          height={150}
          alt="category icon"
          className="mx-auto"
        />
      ) : (
        <div className="w-[100px] h-[150px] mx-auto bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
          No Image
        </div>
      )}
      <h3 className="text-lg font-semibold truncate mt-3">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;
