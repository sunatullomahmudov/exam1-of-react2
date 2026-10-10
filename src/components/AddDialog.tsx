import { useDispatch } from "react-redux";
import { useSetAtom } from "jotai";
import type { FormEvent } from "react";
import { addUserR, type ReduxUser } from "../store/dataSlice";
import type { AppDispatch } from "../store/store";
import { useZustand, type UserZ } from "../store/zustand";
import { addUserJ, type JotaiUser } from "../store/jotai";

type AddDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AddDialog = ({ open, setOpen }: AddDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { addUserZ } = useZustand();
  const addJ = useSetAtom(addUserJ);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const id = Date.now();

    const reduxList: ReduxUser = {
      id,
      job: String(formData.get("job") ?? ""),
      status: formData.get("status") === "true",
    };

    const zustandList: UserZ = {
      id,
      name: String(formData.get("name") ?? ""),
      image: String(formData.get("image") ?? ""),
    };

    const jotaiList: JotaiUser = {
      id,
      phone: String(formData.get("phone") ?? ""),
      city: String(formData.get("city") ?? ""),
    };

    dispatch(addUserR(reduxList));
    addUserZ(zustandList);
    addJ(jotaiList);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <dialog className="dialog" open>
      <form onSubmit={handleSubmit}>
        <input name="image" placeholder="image" />
        <input name="name" placeholder="name" />
        <input name="job" placeholder="job" />
        <input name="phone" placeholder="phone" />
        <input name="city" placeholder="city" />
        <select name="status" defaultValue="true">
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button type="submit">Add User</button>
        <button type="button" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </form>
    </dialog>
  );
};

export default AddDialog;
