'use client'

import Header from "@/components/header";
// import Link from "next/link";
import styles from './styles.module.css';
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import { FormEvent } from "react";
import { login } from "@/service/api";

interface loginType {
    [email:string]: string;
    password: string;
}

export default function Page() {

    async function loginTest(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)

        const formObject = {} as loginType;
        formData.forEach((value, key) => {
            if(typeof value === 'string'){
                formObject[key] = value;
            }
          });

        const response = await login(formObject);

        if(response.code === 200){
            alert(response.message);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            window.location.href = '/'; // Redirect to home page after successful registration
        } else {
            alert(response.message);
        }
    }

    return (
        <div>
            <Header></Header>
            <header className={styles.home}>
                <div className="bg-zinc-400 p-6 opacity-85 rounded-xl">
                    <form onSubmit={loginTest}>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 flex-col items-center">
                            <h1 className="text-2xl">Login</h1>
                            <Input required className="w-80" name="email" type="email" label="Email" />
                            <Input required className="w-80" name="password" type="password" label="password"/>
                            <Button type="submit" color="primary">Login</Button>
                        </div>
                    </form>
                </div>
            </header>
        </div>
    )
};