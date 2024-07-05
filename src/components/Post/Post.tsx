import { Comments } from "../Comments/Comments";
import { FormComment } from "../FormComment/FormComment";

export function Post() {
  return (
    <div className="px-9">
      <div>
        <h1 className="mt-5 text-3xl font-bold underline text-center">Ovtcharov alc</h1>
    
      </div>
      <br />
      <img
        className=" rounded-lg mb-3"
        src="https://ttgearlab.com/wp-content/uploads/2023/08/15.jpg?w=1024"
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint numquam
        hic voluptates mollitia illum vero, pariatur reprehenderit, commodi
        recusandae voluptatum placeat odit corrupti consequuntur culpa alias?
        Enim commodi delectus nesciunt?
      </p>
      <section className=" flex space-x-3 mb-3">
        <p>14 likes</p>
        <p>2 comments</p>
      </section>

      <FormComment></FormComment>
      <Comments></Comments>
    </div>
  );
}
