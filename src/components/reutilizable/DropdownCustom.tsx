
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { MenuIcon } from "lucide-react"



/* 
? Component calling DropdownCustom example (server side rendering)
const options = {
   label: "menu",
   items: [
     {
       label: "Streams",
       href: "/streamed-games"
     },
     {
       label: "Season stats",
       href: "/season-stats",
     },
     {
       label: "Advanced",
       href: "/advanced",
     }
   ]
 }

 <DropdownCustom label={options.label} items={options.items} />
*/

type Props = {
  label: string;
  items: {
    label: string;
    href: string;
    icon: React.ReactNode
  }[];
};


const DropdownCustom = ({ label, items }: Props) => {

  // console.log(items);

  return (
    <div className="">
      <DropdownMenu modal={true}>
        <DropdownMenuTrigger className="text-celtics px-4 py-1 border rounded-lg shadow-lg">
          <MenuIcon className="" color="green" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5">
          <DropdownMenuLabel className="uppercase text-celtics">{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {
            items.map((item: any, index: number) => (
              <DropdownMenuItem key={index} className="hover:bg-slate-200/70">
                <div className="flex items-center justify-center gap-2">
                  <span>{item.icon}</span>
                  <Link href={item.href} className="text-muted-foreground hover:underline" target={item.label == "My website" ? "_blank" : ""} >{item.label}</Link>
                </div>
              </DropdownMenuItem>
            ))
          }
        </DropdownMenuContent>
      </DropdownMenu>


    </div>

  );
};

export default DropdownCustom;

