--
-- PostgreSQL database dump
--

\restrict 9Zb9mrFDFezKLMh65qLGEFQ9ziYxO68kQGLEdC3O5Y8H7jhpRfuTTy7X5shcTcQ

-- Dumped from database version 16.15 (Debian 16.15-1.pgdg13+2)
-- Dumped by pg_dump version 16.15 (Debian 16.15-1.pgdg13+2)

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

--
-- Name: enum_usuarios_rol; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_usuarios_rol AS ENUM (
    'Administrador',
    'Gestor de Solicitudes'
);


ALTER TYPE public.enum_usuarios_rol OWNER TO admin;

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
    estado boolean DEFAULT true
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
    estado character varying(20) DEFAULT 'Pendiente'::character varying NOT NULL
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
    rol public.enum_usuarios_rol NOT NULL,
    estado boolean DEFAULT true
);


ALTER TABLE public.usuarios OWNER TO admin;

--
-- Data for Name: almacenes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.almacenes (id_almacen, nombre, direccion, estado) FROM stdin;
7851ee33-0fb6-49e4-a895-f096bf73cb27	Almacén Central Norte	Zona Industrial Bodega 5	t
2d958155-a6f2-403c-b837-11be22a70beb	Almacén Sur	Av. Principal #80-10	t
\.


--
-- Data for Name: ciudades; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.ciudades (id_ciudad, nombre) FROM stdin;
\.


--
-- Data for Name: clinicas; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.clinicas (id_clinica, nombre, nit, direccion, telefono, responsable, estado) FROM stdin;
8b44e820-8c6c-4230-82f7-2dedac317df3	Clínica Las Américas	900123456-1	Calle 10 #45-20	6041234567	Dra. María Gómez	t
506bcf18-b1b3-4443-b023-3fab8196c5b7	Centro Médico San José	900987654-2	Carrera 15 #30-12	6049876543	Dr. Carlos Pérez	t
\.


--
-- Data for Name: detalle_solicitudes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.detalle_solicitudes (id_solicitud, id_medicamento, cantidad) FROM stdin;
dff0ea14-f5b5-436a-84d0-aa12c130ecb1	b6c6133c-11b2-4d3f-bdc0-9f2215930a8f	10
\.


--
-- Data for Name: inventarios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.inventarios (id_almacen, id_medicamento, cantidad) FROM stdin;
7851ee33-0fb6-49e4-a895-f096bf73cb27	b6c6133c-11b2-4d3f-bdc0-9f2215930a8f	90
\.


--
-- Data for Name: medicamentos; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.medicamentos (id_medicamento, codigo, nombre, descripcion, precio, estado) FROM stdin;
b6c6133c-11b2-4d3f-bdc0-9f2215930a8f	MED-001	Acetaminofén 500mg	Analgésico y antipirético	1500.00	t
ddd944e2-666a-403a-af70-9ea691fead1e	MED-002	Amoxicilina 500mg	Antibiótico de amplio espectro	3200.00	t
67d2f3ae-8b72-423e-9c9e-1e08c2b12043	MED-003	Ibuprofeno 400mg	Antiinflamatorio no esteroideo	2100.00	t
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
dff0ea14-f5b5-436a-84d0-aa12c130ecb1	8b44e820-8c6c-4230-82f7-2dedac317df3	7851ee33-0fb6-49e4-a895-f096bf73cb27	45f10add-318c-477c-a980-8219ebb461ff	2026-08-31 21:23:11.939+00	Aprobada
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.usuarios (id_usuario, nombre, correo, contrasena, rol, estado) FROM stdin;
45f10add-318c-477c-a980-8219ebb461ff	Admin General	admin@riwimedicare.com	$2b$10$HEB4puKd.iClMpXA7YF3.uSvySX0ymANeUd347QsBS5Hgwz9uv3qO	Administrador	t
fcdba790-6c3c-44e8-adc3-9bbe25ed7faa	Gestor de Solicitudes 1	gestor@riwimedicare.com	$2b$10$fdO7n.85Dgml9vjdc2qHCOX3usxKUToL9ESzb2K0Z4AhNqqsB.Vz2	Gestor de Solicitudes	t
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

\unrestrict 9Zb9mrFDFezKLMh65qLGEFQ9ziYxO68kQGLEdC3O5Y8H7jhpRfuTTy7X5shcTcQ

