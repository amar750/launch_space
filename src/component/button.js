const Button = ({
    btnName,
    style,
    ...props
}) => {
    return(
        <button {...props} style={{background:style,cursor:'pointer'}}>{btnName}</button>
    )
}
export default Button;