export default function NavBar() {
  return (   
<header className="h-14 sm:h-14 mb-3  bg-red-700 flex shrink-0  justify-between items-center"> 
  <div className="ml-20">
    <a href="/">TT Cyclopedia</a>
  </div>
  <nav className="ml-2 mr-20">
    <ul>
      <a href="/createPost">Create Post</a>
    </ul>
  </nav>
</header>
  );
}