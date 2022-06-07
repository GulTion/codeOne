import { customAlphabet } from "nanoid";
import { store } from "../App";
export const nanoid = customAlphabet("1234567890abcdef", 10);
// model.id = nanoid() //=> "4f90d13a42"
export const ad_loBuilder = (f, ad, lo) => {
  //   console.log(f);
  if (f.type === "folder") {
    f.address = ad;
    f.location = lo;
    f.id = nanoid();
    f.files.forEach((e, i) => {
      ad_loBuilder(e, [...ad, e.name], [...lo, i]);
    });
  } else {
    f.id = nanoid();

    f.address = ad;
    f.location = lo;
  }
};

export const locator = (cb) => {
  let p;
  document.setEv((k) => {
    if (k.id) {
      let str = "files";
      let pstr = "files";
      k?.location.forEach((e, i) => {
        str += `.files[${e}]`;
        if (k.location.length - 1 > i) {
          pstr += `.files[${e}]`;
        }
      });

      const content = k.content;
      if (cb) cb({ content, location: str, plocation: pstr });
      p = { content, location: str, plocation: pstr };
      return k;
    }
  });
  return p;
};
document.locator = locator;

export const Saver = () => {
  //   console.log(file);

  locator((k) => {
    let str = k.location;
    str += `.content = action.data.content;`;
    const content = k.content;
    store.dispatch({
      type: "SAVE_FILE",
      data: {
        content,
        location: str,
      },
    });
  });
};

// Saver();
