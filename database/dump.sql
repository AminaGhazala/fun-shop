--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	7	1	2999
2	8	1	2999
3	10	1	2999
4	11	1	2999
5	12	2	2595
6	13	1	2999
7	49	1	2999
8	52	1	2999
9	53	1	2999
10	54	1	2999
11	55	1	2999
12	56	1	2999
13	57	1	2999
14	58	1	2999
15	59	1	2999
16	60	1	2999
17	60	1	2999
18	60	2	2595
19	60	3	2900
20	60	1	2999
21	65	5	9900
22	66	1	2999
23	67	2	2595
24	68	2	2595
25	69	2	2595
26	70	2	2595
27	71	3	2900
28	72	3	2900
29	73	2	2595
30	74	1	2999
31	75	3	2900
32	76	5	9900
33	77	3	2900
34	78	1	2999
35	79	4	999
36	77	2	2595
37	77	1	2999
38	77	6	830
39	77	1	2999
40	77	2	2595
41	77	2	2595
42	77	5	9900
43	77	1	2999
44	77	5	9900
45	77	2	2595
46	65	5	9900
47	65	2	2595
48	65	1	2999
49	77	2	2595
50	77	1	2999
51	95	4	999
52	96	5	9900
53	97	6	830
55	98	1	2999
57	99	1	2999
58	99	2	2595
59	99	3	2900
60	99	2	2595
61	99	6	830
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-07-24 11:10:10.217681-07
2	2020-07-24 11:10:39.92554-07
3	2020-07-24 11:11:11.79317-07
4	2020-07-24 11:11:14.908517-07
5	2020-07-24 11:14:38.591107-07
6	2020-07-24 11:14:59.447288-07
7	2020-07-24 11:23:48.407366-07
8	2020-07-24 11:25:01.272131-07
9	2020-07-24 11:30:00.113651-07
10	2020-07-24 11:30:32.627526-07
11	2020-07-24 11:36:34.407015-07
12	2020-07-24 11:36:48.587374-07
13	2020-07-24 11:36:56.413354-07
14	2020-07-24 11:56:59.248203-07
15	2020-07-24 11:57:47.883755-07
16	2020-07-24 11:58:04.785399-07
17	2020-07-24 11:58:16.113263-07
18	2020-07-24 11:58:28.034995-07
19	2020-07-24 11:58:44.581554-07
20	2020-07-24 11:58:51.90801-07
21	2020-07-24 11:59:03.961662-07
22	2020-07-24 11:59:39.12005-07
23	2020-07-24 12:04:20.032074-07
24	2020-07-24 12:05:38.449737-07
25	2020-07-24 12:05:53.13217-07
26	2020-07-24 12:06:12.573974-07
27	2020-07-24 12:06:28.161635-07
28	2020-07-24 12:06:49.963023-07
29	2020-07-24 12:07:02.556389-07
30	2020-07-24 12:08:03.375819-07
31	2020-07-24 12:08:11.337599-07
32	2020-07-24 12:10:01.377445-07
33	2020-07-24 12:10:19.058479-07
34	2020-07-24 12:10:31.317534-07
35	2020-07-24 12:10:51.070665-07
36	2020-07-24 12:11:00.908384-07
37	2020-07-24 12:11:09.590447-07
38	2020-07-24 12:11:18.161364-07
39	2020-07-24 12:11:29.429115-07
40	2020-07-24 12:11:58.375777-07
41	2020-07-24 12:12:06.464222-07
42	2020-07-24 12:13:01.490176-07
43	2020-07-24 12:13:14.551442-07
44	2020-07-24 12:18:24.290468-07
45	2020-07-24 12:29:31.622215-07
46	2020-07-24 12:30:22.25627-07
47	2020-07-24 12:31:12.794339-07
48	2020-07-24 12:31:56.078111-07
49	2020-07-24 12:34:56.903593-07
50	2020-07-24 12:36:42.528364-07
51	2020-07-24 12:37:05.242092-07
52	2020-07-24 12:37:48.271813-07
53	2020-07-24 12:38:08.205215-07
54	2020-07-24 12:39:47.710998-07
55	2020-07-24 12:40:19.74064-07
56	2020-07-24 12:41:40.848649-07
57	2020-07-24 12:41:58.658725-07
58	2020-07-24 12:42:20.250277-07
59	2020-07-24 12:42:33.419563-07
60	2020-07-24 12:42:50.521168-07
61	2020-07-24 12:57:49.004986-07
62	2020-07-24 12:57:55.27523-07
63	2020-07-24 12:58:02.799563-07
64	2020-07-24 13:06:06.221017-07
65	2020-07-24 13:40:06.206769-07
66	2020-07-24 15:14:45.544021-07
67	2020-07-24 15:15:14.00433-07
68	2020-07-24 15:18:11.756548-07
69	2020-07-24 15:18:49.771402-07
70	2020-07-24 15:26:17.454002-07
71	2020-07-24 15:27:51.722509-07
72	2020-07-24 15:27:54.814182-07
73	2020-07-24 15:28:28.037524-07
74	2020-07-24 15:29:02.461138-07
75	2020-07-24 15:30:58.083679-07
76	2020-07-24 15:31:23.479472-07
77	2020-07-24 15:41:09.71909-07
78	2020-07-24 15:44:10.116583-07
79	2020-07-24 15:44:41.102762-07
80	2020-07-24 15:47:41.693867-07
81	2020-07-24 15:47:49.239725-07
82	2020-07-24 15:48:29.746019-07
83	2020-07-24 15:49:33.2272-07
84	2020-07-24 15:49:44.939343-07
85	2020-07-24 15:54:53.944008-07
86	2020-07-24 15:55:32.515826-07
87	2020-07-24 15:57:46.088656-07
88	2020-07-24 15:57:57.982377-07
89	2020-07-24 15:58:06.4673-07
90	2020-07-24 16:02:46.165122-07
91	2020-07-24 16:02:57.092027-07
92	2020-07-24 16:03:11.516822-07
93	2020-07-24 16:03:50.616526-07
94	2020-07-24 16:03:53.68839-07
95	2020-07-24 16:16:58.014068-07
96	2020-07-24 16:17:02.484987-07
97	2020-07-24 16:17:08.285593-07
98	2020-07-24 16:33:17.672093-07
99	2020-07-24 16:58:40.170706-07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Shake Weight	2999	/images/shake-weight.jpg	Dynamic Inertia technology ignites muscles in arms, shoulders, and chest.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
2	ShamWow	2595	/images/shamwow.jpg	It's like a chamois, towel, and sponge, all in one! Soaks up to 10x it's weight in any liquid!	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
3	Snuggie	2900	/images/snuggie.jpg	Super-Soft Fleece with pockets! One Size fits all Adults! Keeps you Warm & Your Hands-Free!	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
4	Wax Vac	999	/images/wax-vac.jpg	Gentle way to remove ear wax. Safe and hygienic. Reduces the risk of painful infections.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
5	Ostrich Pillow	9900	/images/ostrich-pillow.jpg	Create your own snugly space in the world and feel-good anywhere with the ultimate cocoon pillow.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
6	Tater Mitts	830	/images/tater-mitts.jpg	8 Seconds is all you need with Tater Mitts. Quickly and easily prepare all your favorite potato dishes with Tater Mitts.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 61, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 99, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

