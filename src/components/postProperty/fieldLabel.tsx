export default function FieldLabel({label, customClass}: {label: string, customClass?: string}){
    return(
        <p className={`text-text-black font-medium text-sm ${customClass}`}>{label}</p>
    )
}