

import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
    <main className={styles.main}>
      
      <div className="ml-80">
        {/* <div>KettleOn</div> */}
        <div className="flex">
      <button className="mr-2 bg-transparent hover:bg-gray-900 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">
  Sign In
</button>  
<button className="bg-transparent hover:bg-gray-900 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">
  Register
</button> 
</div>
      </div>
     <video 
    src={require("../../public/loopHD.mp4")}
    autoPlay
    muted
    loop
    className={styles.video}
/> 
    </main>
  );
}

