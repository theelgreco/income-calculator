<script setup lang="ts">
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Calendar, Cog, CreditCard, Home, Plus } from "lucide-vue-next";
import ProfileAvatar from "./ProfileAvatar.vue";

const items = [
    {
        title: "Home",
        to: { name: "year", params: { year: new Date().getFullYear() } },
        icon: Home,
    },
    {
        title: "Calendar",
        to: { name: "year", params: { year: new Date().getFullYear() } },
        icon: Calendar,
    },
    {
        title: "Transactions",
        to: { name: "transactions" },
        icon: CreditCard,
    },
    {
        title: "Add transaction",
        to: { name: "createTransaction" },
        icon: Plus,
    },
    {
        title: "Settings",
        to: { name: "transactions" },
        icon: Cog,
    },
];
</script>

<template>
    <Sidebar side="right" class="md:hidden">
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in items" :key="item.title">
                            <SidebarMenuButton asChild>
                                <RouterLink :to="item.to">
                                    <component :is="item.icon" />
                                    <span>{{ item.title }}</span>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <ProfileAvatar class="w-full" />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
</template>
