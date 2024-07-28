import FormComment from "../FormComment/FormComment";
import FormInfo from "../FormInfo/FormInfo";

export default function Post() {
  return (
    <>
      <div>
        <h1 className="">Ovtcharov alc</h1>
      </div>
      <br />

      <div className="">
        <img
          className=""
          src="https://ttgearlab.com/wp-content/uploads/2023/08/15.jpg?w=1024"
        />
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint numquam
          hic voluptates mollitia illum vero, pariatur reprehenderit, commodi
          recusandae voluptatum placeat odit corrupti consequuntur culpa alias?
          Enim commodi delectus nesciunt?
        </p>
      </div>
      <FormInfo></FormInfo>

      <div className="">
        <FormComment></FormComment>
      </div>
    </>
  );
}
