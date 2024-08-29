import PropTypes from "prop-types";
import logo from "../../assets/img/EscudoTransparente.png";
import { useState } from "react";
import { useRegister } from "../../hooks";
import toast from "react-hot-toast";
import axios from "axios";

export const Register = ({ switchAuthHandler }) => {
  const { register, isLoading} = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !username || !name || !surname) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    let picture = profilePicture;
    if (profilePicture === null) {
      const img = await axios.get(
        "https://cdn-icons-png.flaticon.com/512/5524/5524669.png",
        { responseType: "blob" }
      );
      picture = new File([img.data], "avatarDefault.png", {
        type: img.data.type
      })
    }

    await register(email, username, password, name, surname, picture)
  };

  const handleProfilePictureChange = (e) =>{
    if(e.target.files[0]){
      setProfilePicture(e.target.files[0])
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Kinal" src={logo} className="mx-auto h-20 w-auto" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
          Formulario de registro
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6"
            >
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="surname"
              className="block text-sm font-medium leading-6"
            >
              Apellido
            </label>
            <div className="mt-2">
              <input
                id="surname"
                name="surname"
                type="text"
                required
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium leading-6"
            >
              Profile Picture
            </label>
            <div className="mt-2">
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {isLoading ? "Registrando..." : "Registro"}
            </button>
          </div>
        </form>

        <span
          onClick={switchAuthHandler}
          className="block mt-8 text-center text-sm text-blue-600 cursor-pointer hover:underline"
        >
          ¿Ya tienes una cuenta?... Inicia sesión acá Acá!
        </span>
      </div>
    </div>
  );
};

Register.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};
