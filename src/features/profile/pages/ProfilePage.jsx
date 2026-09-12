import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Cookies from "js-cookie";

import { paths } from "@/paths";

function ProfilePage() {
  const user = JSON.parse(Cookies.get("user"));

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(paths.login, { replace: true });
    Cookies.remove("token");
    Cookies.remove("user");
  };

  return (
    <>
      <div className="md:w-125 md:mx-auto flex flex-col justify-end">
        <h1 className="text-2xl font-semibold text-text-primary flex justify-start p-4">
          Profile
        </h1>

        <Card className="mt-4  p-4 w-full">
          <p className="text-sm text-text-muted">Signed in as</p>
          <p className="text-sm text-text-muted">{user.email}</p>
        </Card>

        <p className="mt-4 text-sm text-text-muted">
          Profile page still work on progress
        </p>

        <Button className="mt-6 w-full" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
}

export default ProfilePage;
