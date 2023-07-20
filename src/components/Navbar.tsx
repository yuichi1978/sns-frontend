import { useAuth } from "@/context/auth";
import Link from "next/link";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-teal-300 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/" className="text-xl md:text-2xl font-bold">SNS Clone</Link>
        </h1>
        <nav>
          <ul>
            {user ? (
              <div className="flex space-x-2">
                <Link href={`/profile/${user.id}`} className="text-sm md:text-lg bg-white text-gray-500 py-2 px-3 rounded-lg font-medium">
                  プロフィール
                </Link>
                <button onClick={logout} className="text-sm md:text-lg bg-white text-gray-500 py-2 px-3 rounded-lg font-medium">
                  ログアウト
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login" className="text-sm md:text-lg text- bg-white text-gray-500 py-2 px-2 rounded-lg font-medium">
                  ログイン
                </Link>
                <Link href="/signup" className="text-sm md:text-lg bg-white text-gray-500 py-2 px-3 rounded-lg font-medium">
                  サインアップ
                </Link>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;