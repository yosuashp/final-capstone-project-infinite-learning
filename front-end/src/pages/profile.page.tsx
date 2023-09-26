import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";
import { IUser } from "../api/types";
import TwoFactorAuth from "../components/TwoFactorAuth";
import useStore from "../store";

const ProfilePage = () => {
  const [secret, setSecret] = useState({
    otpauth_url: "",
    base32: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const store = useStore();
  const user = store.authUser;

  const generateQrCode = async ({
    user_id,
    email,
  }: {
    user_id: string;
    email: string;
  }) => {
    try {
      store.setRequestLoading(true);
      const response = await authApi.post<{
        otpauth_url: string;
        base32: string;
      }>("/auth/otp/generate", { user_id, email });
      store.setRequestLoading(false);

      if (response.status === 200) {
        setOpenModal(true);
        console.log({
          base32: response.data.base32,
          otpauth_url: response.data.otpauth_url,
        });
        setSecret({
          base32: response.data.base32,
          otpauth_url: response.data.otpauth_url,
        });
      }
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const disableTwoFactorAuth = async (user_id: string) => {
    try {
      store.setRequestLoading(true);
      const {
        data: { user },
      } = await authApi.post<{
        otp_disabled: boolean;
        user: IUser;
      }>("/auth/otp/disable", { user_id });
      store.setRequestLoading(false);
      store.setAuthUser(user);
      toast.warning("Two Factor Authentication Disabled", {
        position: "top-right",
      });
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    console.log(store.authUser);
    if (!store.authUser) {
      navigate("/login");
    }
  }, []);

  


  return (
    <>
      <section className="bg-ct-yellow-600  min-h-screen pt-10">
        <div className="max-w-4xl p-12 mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex gap-20 justify-center items-start">
          <div className="flex-grow-2">
            <h1 className="text-2xl font-semibold">Profile Page</h1>
            <div className="mt-8">
              <p className="mb-4">ID: {user?.id}</p>
              <p className="mb-4">Name: {user?.name}</p>
              <p className="mb-4">Email: {user?.email}</p>
            </div>
            <h1 className="text-2xl font-semibold">Product Information</h1>
            <div className="mt-8">
              <img src="https://down-id.img.susercontent.com/file/id-11134207-7qukw-leoyekdjb7qb65" alt="https://down-id.img.susercontent.com/file/id-11134207-7qukw-leoyekdjb7qb65" />
              <p className="mb-4">Name: sepatu sekolah</p>
              <p className="mb-4">Type: 36, 37, 38, 39, 40, 41, 42, 42, 43</p>
              <p className="mb-4">Phone: +628811564391</p>
            </div>
            <div className="mt-4">
              <a
                href="https://wa.me/+628811564391" // Ganti nomor WhatsApp dengan yang sesuai
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
              >
                Contact Seller on WhatsApp
              </a>
            </div>
            <div className="product-1">
                <h1 className="text-2xl font-semibold">Product Information</h1>
                <div className="mt-8">
                  <img src="https://down-id.img.susercontent.com/file/id-11134207-7qul1-lhw358fum67ef0" alt="" />
                  <p className="mb-4">Name: Sneakers</p>
                  <p className="mb-4">Type: 36, 37, 38, 39, 40, 41, 42, 42, 43</p>
                  <p className="mb-4">Phone: +628811564391</p>
                </div>
                <div className="mt-4">
                  <a
                    href="https://wa.me/+628811564391" // Ganti nomor WhatsApp dengan yang sesuai
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  >
                    Contact Seller on WhatsApp
                  </a>
                </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              Mobile App Authentication (2FA)
            </h3>
            <p className="mb-4">
              Secure your account with TOTP two-factor authentication.
            </p>
            {store.authUser?.otp_enabled ? (
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                onClick={() => disableTwoFactorAuth(user?.id!)}
              >
                Disable 2FA
              </button>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                onClick={() =>
                  generateQrCode({ user_id: user?.id!, email: user?.email! })
                }
              >
                Setup 2FA
              </button>
            )}
              <div className="product-2">
                <h1 className="text-2xl font-semibold">Product Information</h1>
                <div className="mt-8">
                  <img className="pictures" src="https://down-id.img.susercontent.com/file/id-11134207-7r98p-lm41723lqox7cb" alt="" />
                  <p className="mb-4">Name: Sepatu Hitam</p>
                  <p className="mb-4">Type: 42, 43, 44, 45</p>
                  <p className="mb-4">Phone: +628811564391</p>
                </div>
                <div className="mt-4">
                  <a
                    href="https://wa.me/+628811564391" // Ganti nomor WhatsApp dengan yang sesuai
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  >
                    Contact Seller on WhatsApp
                  </a>
                </div>
              </div>
              <div className="product-2">
                <h1 className="text-2xl font-semibold">Product Information</h1>
                <div className="mt-8">
                <img className="pictures" src="https://down-id.img.susercontent.com/file/id-11134207-7r990-lm41723ls3hn24" alt="" />
                  <p className="mb-4">Name: Sepatu putih</p>
                  <p className="mb-4">Type: 38, 40, 42, 43, 44, 45, 46</p>
                  <p className="mb-4">Phone: +628811564391</p>
                </div>
                <div className="mt-4">
                  <a
                    href="https://wa.me/+628811564391" // Ganti nomor WhatsApp dengan yang sesuai
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  >
                    Contact Seller on WhatsApp
                  </a>
                </div>
              </div>
          </div>
        </div>
      </section>
      {openModal && (
        <TwoFactorAuth
          base32={secret.base32}
          otpauth_url={secret.otpauth_url}
          user_id={store.authUser?.id!}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default ProfilePage;
