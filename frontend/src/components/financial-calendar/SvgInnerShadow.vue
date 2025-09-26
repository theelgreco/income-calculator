<template>
    <!-- This is a filter that applies an inner shadow to the triangle icons -->
    <svg class="hidden">
        <defs>
            <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <!-- Take the shape -->
                <feGaussianBlur in="SourceAlpha" stdDeviation="0.7" result="blur" />
                <feOffset dx="0" dy="0" result="offsetBlur" />

                <!-- Make it dark -->
                <feFlood flood-color="black" flood-opacity="0.7" result="shadowColor" />
                <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="shadow" />

                <!-- Place inside the shape -->
                <feComposite in="SourceGraphic" in2="shadow" operator="out" />
            </filter>
        </defs>
    </svg>
</template>
