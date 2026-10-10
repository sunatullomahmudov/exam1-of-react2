import { useDispatch } from "react-redux";
import { useSetAtom } from "jotai";
import { editUserR, type ReduxUser } from "../store/dataSlice";
import type { AppDispatch } from "../store/store";
import { useZustand, type UserZ } from "../store/zustand";
import { editUserJ, type JotaiUser } from "../store/jotai";
import type { CombinedUser } from "../store/types";

type EditDialogProps = {
  selectedUser: CombinedUser;
  setOpen: (value: boolean) => void;
  setSelectedUser: (value: CombinedUser | null) => void;
};

const EditDialog = ({ selectedUser, setOpen, setSelectedUser }: EditDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { editUserZ } = useZustand();
  const editJ = useSetAtom(editUserJ);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const id = selectedUser.id;

    const reduxObj: ReduxUser = {
      id,
      job: String(formData.get("job") ?? ""),
      status: String(formData.get("status")) === "true",
    };

    const zustandObj: UserZ = {
      id,
      name: String(formData.get("name") ?? ""),
      image: String(formData.get("image") ?? ""),
    };

    const jotaiObj: JotaiUser = {
      id,
      phone: String(formData.get("phone") ?? ""),
      city: String(formData.get("city") ?? ""),
    };

    dispatch(editUserR(reduxObj));
    editUserZ(zustandObj);
    editJ(jotaiObj);
    setSelectedUser(null);
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  return (
    <dialog className="dialog" open>
      <form onSubmit={handleSubmit}>
        <input name="image" placeholder="image" defaultValue={selectedUser.image} />
        <input name="name" placeholder="name" defaultValue={selectedUser.name} />
        <input name="job" placeholder="job" defaultValue={selectedUser.job} />
        <input name="phone" placeholder="phone" defaultValue={selectedUser.phone} />
        <input name="city" placeholder="city" defaultValue={selectedUser.city} />
        <select name="status" defaultValue={String(selectedUser.status)}>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </dialog>
  );
};

export default EditDialog;
