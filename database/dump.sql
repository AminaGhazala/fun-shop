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
    price numeric(100,2) NOT NULL
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
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "address" text NOT NULL,
    "address2" text,
    "zipcode" text NOT NULL,
    "city" text NOT NULL,
    "state" text NOT NULL,
    "phone" text,
    "cardSecurityCode" text NOT NULL,
    "cardExpMonth" text NOT NULL,
    "cardExpYear" text NOT NULL,
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
    price numeric(100,2) NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    "newArrival" boolean NOT NULL,
    "mostPopular" boolean NOT NULL
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
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription", "newArrival", "mostPopular") FROM stdin;
1	Back to The Future Part II Time Machine	39.99	/images/back-to-the-future.jpg,/images/back-to-the-future-1.jpg,/images/back-to-the-future-2.jpg	Jada Toys Back to The Future Part II Time Machine with Lights 1:24 Scale	Entertainment Earth Exclusive!\n\n The toy you always wanted is finally here.\n Based on the 1989 Back to the Future II movie, this is the best toy DeLorean money can buy.\n Not only does it feature classic DMC engineering (like the gull-wing doors) and Doc Brown's own special modifications, but our version of the DeLorean automobile also has the 2015 hover conversion kit.\n\n That's right, our exclusive vehicle has wheels that pop out for "flight mode"! \nThe wheels spin, the doors open, and its plastic construction feels just like the toy you always wished you had.\n Don't miss your chance at owning one of America's finest motorcars ... with a special futuristic, time-traveling twist!\n\n It's a limited edition.\n\n 13-inch long vehicle that's compatible with many 3 3/4-inch scale action figures* (not included).\n Sound effects include: First time travel, Car trouble, Revving up and winding down, Opening door, Rev up and peel out, Engine start-up, Return from time travel, Return from time travel to a screeching halt, Time circuit engaged, Hover landing!	f	t
2	Minions Holiday Series Figure	10.99	/images/minions.jpg,/images/minions-1.jpg,/images/minions-2.jpg,/images/minions-3.jpg,/images/minions-4.jpg,/images/minions-5.jpg	Minions Holiday Series \nBlind Box Figure	Join your favorite sidekick characters from Despicable Me Minions on holiday!\n\n These guys are ready to hit the beach and go surfing!\n There are twelve different designs with the possibility of a secret (chase) in some of the sets by random (1:144 chance)!\n\nThe Minions Holiday Series Blind Box Random Figure contains 1 randomly selected, individually blind-packaged mini-figure.\nBreakdown not available at this time.	f	t
3	Hammer Opener	8.99	/images/hammer-openner.jpg	Creative World of Warcraft Retro Hammer Opener Sounding Beer Bottle Opener	Color: \n1. Copper\n2. Silver\n\nSize:\n 1. Normal size: 235 x 90cm, screwdriver can be heard, metallic feel \n2. Small size: no screwdriver, non-sounding, plastic material	f	t
4	Wall-E UDF Figure	14.99	/images/wall-e.jpg,/images/wall-e-1.jpg	UDF(Ultra Detail Figure) Pixar wall-e non-scale PVC pre-painted finished goods	Wall-E returns to the UDF line, updated and re-newed!\n\n Depicts he waving a friendly hello.\n\n He stands approximately 2.55 inch tall and made of PVC (plastic) material.\n\n Great gift for Wall-E fans!	f	t
5	Frozen 2 Elsa Master Craft Figure	299.99	/images/elsa-figure.jpg	Disney Frozen Master Craft \nFrozen 2 Elsa Statue	From Beast Kingdom.\n\n The magical charm of ice and snow returns!\n\n Dressed in an elegant flowing dress and a snow white cape fit for a queen, the figure brings to life Elsa's brave nature!\n\n This high-end Master Craft series weds conventional and 3D modeling to finely mold and portray Elsa's unique charm!\n\n\n With their expressive charm and new clothing, this collection is sure to become a classic!	f	t
6	Spider-Man Egg Attack Figure	69.99	/images/egg-attack.jpg	Far From Home Spider-Man \n(Upgraded Suit Ver.)	Your friendly neighborhood Spider-Man swings back into action, sporting the new red and black suit from Spider-Man Far From Home!\n\n The latest in the Egg Attack Action (EAA) range of Marvel 6-inch super hero action figures,\n Spidey comes with 2 interchangeable head sculpts;\n replacement mouth and eyes;\n and a suit made from real, stretchable cloth, perfect for any type of pose!\n\n Also included are accessories including a pizza slice and a mobile phone.	f	t
7	Star Wars Metacolle Figure Collection	29.99	/images/star-wars-series.jpg	[Limited Edition] Metal Collection Star Wars special set 	'Metacolle', made using alloys by Takaratomi, who makes Tomica, is an abbreviation of the metal figure collection.\n\n It provides mobility for arms, waist, and head,\n and is a lineup of figures that stand out with heavy weight and delicate presentation.\nKyloren, BB-5, and First Order Stormtrooper, who appeared in the new Star Wars series, joined the Meta This series.\n\nMeet three Metacore figures.	t	f
8	StarCraft 2 Jim Raynor Figure	35.99	/images/starcraft-ds043.jpg	Beast Kingdom StarCraft 2 Jim Raynor 10th Anniversary Figure	From Beast Kingdom.\n Celebrating its tenth anniversary. \n\nBeast Kingdom has teamed up with Blizzard to launch the D-Stage.\n Staging Your Dreams selection of classic Starcraft II characters: Jim Raynor and Sarah Louise Kerrigan!\n\n These figures of the pair of seasoned warriors (sold separately) are fit for any fans' desk!	t	f
9	Batman Automobilia Collection	54.99	/images/batman-car.jpg,/images/batman-car-1.jpg,/images/batman-car-2.jpg	State of the art Batmobile inspired by the new Justice League movie	New from the Justice League movie comes this 20" by 12" scale, highly detailed Batmobile for the adult collector!\n\n The updated, iconic Batman vehicle features true-to-movie design, weaponry and armored wheels with metal axles.\n Open the driver's canopy and seat a 6" scale action figure inside.\n Peer out the tinted windows over the mini guns and speed off.\n When DC Super-Villains are in range, rotate the rocket launcher to optimal position and fire!\n\n The bumper plates turn upward to engage the battering ram.\n Push the Batmobile forward and its linked front tires pivot as they roll.\n\n Recreate favorite action scenes or add this premium item to your collection.\n Experience the thrills of the world's greatest Super Hero's most powerful vehicle!\n\n Action figure sold separately, subject to availability.	t	f
10	Dark Knight Batman Action Figure	89.99	/images/dark-knight.jpg	The Dark Knight Batman Dynamic 8-Ction Heroes Action Figure	Beast Kingdom is proud to introduce fans to the latest 1/9 scale, realistic action figure.\n\n The DAH (Dynamic 8ction Heroes) Dark Knight Batman.\n\n Based on the most popular batsuit from Christopher Nolan's seminal trilogy, the figure uses high composite materials to recreate every fine detail down to the texture on the suit and weaponry.\n With 26 points of articulation, the Dark Knight DAH is one of the most posable figures yet, and includes three replacement mouths, a branded stand with a bracket, as well as five pairs of replacement hands for fans to recreate the most exciting scenes from the films!\n\n No Batman would dare leave his bat-cave without his set of high-tech weaponry, and this set doesn't disappoint.\n\n Included are: One sticky bomb launcher, a grappling gun, bat darts, and a mini smoke bomb, plus Batman's glider backpack attachment!	t	f
11	Dark Knight Tumbler 1:24 Diecast	39.99	/images/dark-knight-tumbler.jpg	"The Dark Knight" Batmobile with Batman Diecast Figure Camouflage Version	Brand new 1/24 scale diecast car model of "The Dark Knight"\n\n Batmobile with Batman Diecast Figure Camouflage Version\n\n "DC Comics" Series die cast model car by Jada.	t	f
12	Marble Series 3 Types	59.99	/images/marble-series.jpg,/images/marble-series-1.jpg,/images/marble-series-2.jpg,/images/marble-series-3.jpg	A special edition of Iron Man, Spider Man and Thanos	Avengers 3: Infinity War\n - Iron Man Mark 50 & Iron Spider Marvel Legends 6 Action Figure 2-Pack\n\nAvengers: Endgame\n - Thanos\n\nInspired by Avengers 3: Infinity War, Hasbro have brought us this awesome 2-Pack of action figures featuring the nanotech-powered Iron Man Mark 50 and Iron Spider teaming up to take on the Mad Titan Thanos!	t	f
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 1, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 1, true);


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
