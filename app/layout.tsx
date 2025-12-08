import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Plus} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {AnimalForm} from "@/components/animal-form";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Terra-Hub",
    description: "Terra-Hub app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
        <header className="bg-dark-green p-4 shadow-sm h-[64px] shrink-0 flex items-center text-white z-10">
            <h1 className="font-bold text-xl">Terra Hub 🦎</h1>
        </header>
        <div className="flex flex-1 overflow-hidden">
            <aside className="w-64 bg-leaf-green border-r border-gray-200 p-6 hidden md:block overflow-y-auto">
                <nav className="space-y-4">
                    <p className="font-bold text-gray-500 text-sm uppercase">Menu</p>
                    {/* Tutaj linki */}
                </nav>
            </aside>

            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

            <div
                className='bg-leaf-green hover:bg-grassy-green transition-colors p-3 shadow-sm fixed bottom-4 right-4 z-10 cursor-pointer rounded-full flex items-center justify-center'>
                <Dialog>
                    <DialogTrigger className='cursor-pointer'>
                        <Plus className="stroke-white"/>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Dodaj nowego podopiecznego</DialogTitle>
                        </DialogHeader>
                        <AnimalForm/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
        </body>
        </html>
    );
}
