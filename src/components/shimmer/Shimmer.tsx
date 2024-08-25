import "./Shimmer.css"

const Shimmer = (props: any) => {
    return (
            <div 
            className="shine"
            style={{
                height: props.height,
                width: props.width,
                borderRadius: props.borderRadius,
                margin: props.margin
            }}
            ></div>
    )
}

export default Shimmer