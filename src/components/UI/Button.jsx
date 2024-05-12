export default function Button({ children, textOnly, className, ...props }) {
  let classNameButton = textOnly ? "text-button" : "button";
  classNameButton += " " + className;

  return (
    <button className={classNameButton} {...props}>
      {children}
    </button>
  );
}
