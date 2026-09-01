--
-- PostgreSQL database dump
--

\restrict xpdjjwBh2aF60cA9gHDchnnnBePIqEWcO3FVpbXTGzY96lngupp5iomg21dzphh

-- Dumped from database version 15.19
-- Dumped by pg_dump version 15.19

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

ALTER TABLE IF EXISTS ONLY public.solicitudes DROP CONSTRAINT IF EXISTS solicitudes_id_usuario_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitudes DROP CONSTRAINT IF EXISTS solicitudes_id_clinica_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitudes DROP CONSTRAINT IF EXISTS solicitudes_id_almacen_fkey;
ALTER TABLE IF EXISTS ONLY public.inventarios DROP CONSTRAINT IF EXISTS inventarios_id_medicamento_fkey;
ALTER TABLE IF EXISTS ONLY public.inventarios DROP CONSTRAINT IF EXISTS inventarios_id_almacen_fkey;
ALTER TABLE IF EXISTS ONLY public.detalle_solicitudes DROP CONSTRAINT IF EXISTS detalle_solicitudes_id_solicitud_fkey;
ALTER TABLE IF EXISTS ONLY public.detalle_solicitudes DROP CONSTRAINT IF EXISTS detalle_solicitudes_id_medicamento_fkey;
ALTER TABLE IF EXISTS ONLY public.usuarios DROP CONSTRAINT IF EXISTS usuarios_pkey;
ALTER TABLE IF EXISTS ONLY public.usuarios DROP CONSTRAINT IF EXISTS usuarios_correo_key3;
ALTER TABLE IF EXISTS ONLY public.usuarios DROP CONSTRAINT IF EXISTS usuarios_correo_key2;
ALTER TABLE IF EXISTS ONLY public.usuarios DROP CONSTRAINT IF EXISTS usuarios_correo_key1;
ALTER TABLE IF EXISTS ONLY public.usuarios DROP CONSTRAINT IF EXISTS usuarios_correo_key;
ALTER TABLE IF EXISTS ONLY public.solicitudes DROP CONSTRAINT IF EXISTS solicitudes_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.medicamentos DROP CONSTRAINT IF EXISTS medicamentos_pkey;
ALTER TABLE IF EXISTS ONLY public.medicamentos DROP CONSTRAINT IF EXISTS medicamentos_codigo_key3;
ALTER TABLE IF EXISTS ONLY public.medicamentos DROP CONSTRAINT IF EXISTS medicamentos_codigo_key2;
ALTER TABLE IF EXISTS ONLY public.medicamentos DROP CONSTRAINT IF EXISTS medicamentos_codigo_key1;
ALTER TABLE IF EXISTS ONLY public.medicamentos DROP CONSTRAINT IF EXISTS medicamentos_codigo_key;
ALTER TABLE IF EXISTS ONLY public.inventarios DROP CONSTRAINT IF EXISTS inventarios_pkey;
ALTER TABLE IF EXISTS ONLY public.detalle_solicitudes DROP CONSTRAINT IF EXISTS detalle_solicitudes_pkey;
ALTER TABLE IF EXISTS ONLY public.clinicas DROP CONSTRAINT IF EXISTS clinicas_pkey;
ALTER TABLE IF EXISTS ONLY public.clinicas DROP CONSTRAINT IF EXISTS clinicas_nit_key3;
ALTER TABLE IF EXISTS ONLY public.clinicas DROP CONSTRAINT IF EXISTS clinicas_nit_key2;
ALTER TABLE IF EXISTS ONLY public.clinicas DROP CONSTRAINT IF EXISTS clinicas_nit_key1;
ALTER TABLE IF EXISTS ONLY public.clinicas DROP CONSTRAINT IF EXISTS clinicas_nit_key;
ALTER TABLE IF EXISTS ONLY public.ciudades DROP CONSTRAINT IF EXISTS ciudades_pkey;
ALTER TABLE IF EXISTS ONLY public.almacenes DROP CONSTRAINT IF EXISTS almacenes_pkey;
DROP TABLE IF EXISTS public.usuarios;
DROP TABLE IF EXISTS public.solicitudes;
DROP TABLE IF EXISTS public.roles;
DROP TABLE IF EXISTS public.medicamentos;
DROP TABLE IF EXISTS public.inventarios;
DROP TABLE IF EXISTS public.detalle_solicitudes;
DROP TABLE IF EXISTS public.clinicas;
DROP TABLE IF EXISTS public.ciudades;
DROP TABLE IF EXISTS public.almacenes;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: almacenes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.almacenes (
    id_almacen uuid NOT NULL,
    nombre character varying(100) NOT NULL,
    direccion character varying(150) NOT NULL,
    estado boolean DEFAULT true
);


ALTER TABLE public.almacenes OWNER TO admin;

--
-- Name: ciudades; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.ciudades (
    id_ciudad uuid NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.ciudades OWNER TO admin;

--
-- Name: clinicas; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.clinicas (
    id_clinica uuid NOT NULL,
    nombre character varying(100) NOT NULL,
    nit character varying(20) NOT NULL,
    direccion character varying(150) NOT NULL,
    telefono character varying(20) NOT NULL,
    responsable character varying(100) NOT NULL,
    estado boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.clinicas OWNER TO admin;

--
-- Name: detalle_solicitudes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.detalle_solicitudes (
    id_solicitud uuid NOT NULL,
    id_medicamento uuid NOT NULL,
    cantidad integer NOT NULL
);


ALTER TABLE public.detalle_solicitudes OWNER TO admin;

--
-- Name: inventarios; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.inventarios (
    id_almacen uuid NOT NULL,
    id_medicamento uuid NOT NULL,
    cantidad integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.inventarios OWNER TO admin;

--
-- Name: medicamentos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.medicamentos (
    id_medicamento uuid NOT NULL,
    codigo character varying(50) NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    estado boolean DEFAULT true
);


ALTER TABLE public.medicamentos OWNER TO admin;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.roles (
    id_rol uuid NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO admin;

--
-- Name: solicitudes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.solicitudes (
    id_solicitud uuid NOT NULL,
    id_clinica uuid NOT NULL,
    id_almacen uuid NOT NULL,
    id_usuario uuid NOT NULL,
    fecha_solicitud timestamp with time zone,
    estado character varying(20) DEFAULT 'Pending'::character varying NOT NULL
);


ALTER TABLE public.solicitudes OWNER TO admin;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.usuarios (
    id_usuario uuid NOT NULL,
    nombre character varying(100) NOT NULL,
    correo character varying(100) NOT NULL,
    contrasena character varying(255) NOT NULL,
    rol character varying(50) NOT NULL,
    estado boolean DEFAULT true
);


ALTER TABLE public.usuarios OWNER TO admin;

--
-- Data for Name: almacenes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.almacenes (id_almacen, nombre, direccion, estado) FROM stdin;
bf541a42-b2af-426f-b01a-8eda7f392efe	Almacén Central Norte	Zona Industrial Bodega 5	t
f1adb244-5ee3-4fc9-9e11-10f52788b6dd	Almacén Sur	Av. Principal #80-10	t
\.


--
-- Data for Name: ciudades; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.ciudades (id_ciudad, nombre) FROM stdin;
\.


--
-- Data for Name: clinicas; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.clinicas (id_clinica, nombre, nit, direccion, telefono, responsable, estado, "createdAt", "updatedAt", "deletedAt") FROM stdin;
4273ab06-0703-439d-9f24-560ba87c82ae	Clínica Las Américas	900123456-1	Calle 10 #45-20	6041234567	Dra. María Gómez	t	2026-09-01 00:34:57.368+00	2026-09-01 00:34:57.368+00	\N
70714f34-83b9-48e4-97f4-94f866d7966a	Centro Médico San José	900987654-2	Carrera 15 #30-12	6049876543	Dr. Carlos Pérez	t	2026-09-01 00:34:57.368+00	2026-09-01 00:34:57.368+00	\N
\.


--
-- Data for Name: detalle_solicitudes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.detalle_solicitudes (id_solicitud, id_medicamento, cantidad) FROM stdin;
\.


--
-- Data for Name: inventarios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.inventarios (id_almacen, id_medicamento, cantidad) FROM stdin;
\.


--
-- Data for Name: medicamentos; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.medicamentos (id_medicamento, codigo, nombre, descripcion, precio, estado) FROM stdin;
5a893dab-7599-4750-8d75-56d99c5e2aca	MED-001	Acetaminofén 500mg	Analgésico y antipirético	1500.00	t
2895b841-797c-418a-af89-45c3569ad61b	MED-002	Amoxicilina 500mg	Antibiótico de amplio espectro	3200.00	t
eb145897-5bfc-470a-a199-1b956c4fcf20	MED-003	Ibuprofeno 400mg	Antiinflamatorio no esteroideo	2100.00	t
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.roles (id_rol, nombre) FROM stdin;
\.


--
-- Data for Name: solicitudes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.solicitudes (id_solicitud, id_clinica, id_almacen, id_usuario, fecha_solicitud, estado) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.usuarios (id_usuario, nombre, correo, contrasena, rol, estado) FROM stdin;
576d3562-ea25-4e1f-b81b-cb98deb289e9	Admin General	admin@riwimedicare.com	$2b$10$g5eK5WLlULgmnwYJNyWAf.jRXN4wev2T6GdFuXLJZxX88oMRcdpB.	Administrador	t
d3f711d5-e1c7-4511-af64-806250e1316c	Gestor de Solicitudes 1	gestor@riwimedicare.com	$2b$10$H0wjnXomAo0q2ZOFbv.EsOVQaTGliDL44BsFH9X0TUyVBGYpad59S	Gestor de Solicitudes	t
\.


--
-- Name: almacenes almacenes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.almacenes
    ADD CONSTRAINT almacenes_pkey PRIMARY KEY (id_almacen);


--
-- Name: ciudades ciudades_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ciudades
    ADD CONSTRAINT ciudades_pkey PRIMARY KEY (id_ciudad);


--
-- Name: clinicas clinicas_nit_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_nit_key UNIQUE (nit);


--
-- Name: clinicas clinicas_nit_key1; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_nit_key1 UNIQUE (nit);


--
-- Name: clinicas clinicas_nit_key2; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_nit_key2 UNIQUE (nit);


--
-- Name: clinicas clinicas_nit_key3; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_nit_key3 UNIQUE (nit);


--
-- Name: clinicas clinicas_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clinicas
    ADD CONSTRAINT clinicas_pkey PRIMARY KEY (id_clinica);


--
-- Name: detalle_solicitudes detalle_solicitudes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.detalle_solicitudes
    ADD CONSTRAINT detalle_solicitudes_pkey PRIMARY KEY (id_solicitud, id_medicamento);


--
-- Name: inventarios inventarios_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.inventarios
    ADD CONSTRAINT inventarios_pkey PRIMARY KEY (id_almacen, id_medicamento);


--
-- Name: medicamentos medicamentos_codigo_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_codigo_key UNIQUE (codigo);


--
-- Name: medicamentos medicamentos_codigo_key1; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_codigo_key1 UNIQUE (codigo);


--
-- Name: medicamentos medicamentos_codigo_key2; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_codigo_key2 UNIQUE (codigo);


--
-- Name: medicamentos medicamentos_codigo_key3; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_codigo_key3 UNIQUE (codigo);


--
-- Name: medicamentos medicamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_pkey PRIMARY KEY (id_medicamento);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);


--
-- Name: solicitudes solicitudes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_pkey PRIMARY KEY (id_solicitud);


--
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- Name: usuarios usuarios_correo_key1; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key1 UNIQUE (correo);


--
-- Name: usuarios usuarios_correo_key2; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key2 UNIQUE (correo);


--
-- Name: usuarios usuarios_correo_key3; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key3 UNIQUE (correo);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- Name: detalle_solicitudes detalle_solicitudes_id_medicamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.detalle_solicitudes
    ADD CONSTRAINT detalle_solicitudes_id_medicamento_fkey FOREIGN KEY (id_medicamento) REFERENCES public.medicamentos(id_medicamento) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: detalle_solicitudes detalle_solicitudes_id_solicitud_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.detalle_solicitudes
    ADD CONSTRAINT detalle_solicitudes_id_solicitud_fkey FOREIGN KEY (id_solicitud) REFERENCES public.solicitudes(id_solicitud) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inventarios inventarios_id_almacen_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.inventarios
    ADD CONSTRAINT inventarios_id_almacen_fkey FOREIGN KEY (id_almacen) REFERENCES public.almacenes(id_almacen) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inventarios inventarios_id_medicamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.inventarios
    ADD CONSTRAINT inventarios_id_medicamento_fkey FOREIGN KEY (id_medicamento) REFERENCES public.medicamentos(id_medicamento) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: solicitudes solicitudes_id_almacen_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_id_almacen_fkey FOREIGN KEY (id_almacen) REFERENCES public.almacenes(id_almacen) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: solicitudes solicitudes_id_clinica_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_id_clinica_fkey FOREIGN KEY (id_clinica) REFERENCES public.clinicas(id_clinica) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: solicitudes solicitudes_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict xpdjjwBh2aF60cA9gHDchnnnBePIqEWcO3FVpbXTGzY96lngupp5iomg21dzphh

