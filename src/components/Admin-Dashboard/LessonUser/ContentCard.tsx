// import { Card, CardHeader, CardContent, CardFooter } from "@shadcn/ui";
// import { Button } from "@shadcn/ui";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const ContentCard = ({ content }) => {
    const { word, pronunciation, when_to_say, english_meaning } = content;

    return (
        <Card className="md:w-[300px] shadow-lg text-center font-bold">
            <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold mb-1">{word}</h3>
                <p className="text-xl text-muted-foreground italic">/{pronunciation}/</p>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                    <span className="font-bold">When to Say:</span> {when_to_say}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-bold">Meaning:</span> {english_meaning}
                </p>
            </CardContent>
            {/* <CardFooter>
                <Link href={`/content/${word}`} className="w-full">
                    <Button variant="default" size="lg" className="w-full">
                        Learn More
                    </Button>
                </Link>
            </CardFooter> */}
        </Card>
    );
};

export default ContentCard;