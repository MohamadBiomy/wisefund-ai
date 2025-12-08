import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog"
import type { InitialPropsType } from "@/App"

interface AlertProps extends InitialPropsType {
  trigger: React.ReactNode
  title: string
  description?: string
  actionWhenAccept: () => void
}

function Alert({trigger, title, description = '', actionWhenAccept}: AlertProps) {
  return (
    <>

      <AlertDialog>

        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>

        <AlertDialogContent className="border-border">

          <AlertDialogHeader>
            <AlertDialogTitle>
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="max-w-[80%]">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-text" onClick={actionWhenAccept}>Action</AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>
    
    </>
  )
}

export default Alert