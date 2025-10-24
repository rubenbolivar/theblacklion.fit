import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// POST - Crear nuevo contacto (público)
export async function POST(request) {
  try {
    const data = await request.json();

    // Validación básica
    if (!data.nombre || !data.email || !data.telefono || !data.objetivo || !data.mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben ser completados' },
        { status: 400 }
      );
    }

    const contacto = await prisma.contacto.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        pais: data.pais || null,
        ciudad: data.ciudad || null,
        objetivo: data.objetivo,
        mensaje: data.mensaje,
        leido: false
      }
    });

    return NextResponse.json(
      { message: 'Contacto recibido exitosamente', id: contacto.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contacto:', error);
    return NextResponse.json(
      { error: 'Error al procesar el contacto' },
      { status: 500 }
    );
  }
}

// GET - Obtener todos los contactos (protegido)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const leido = searchParams.get('leido');
    const objetivo = searchParams.get('objetivo');

    const where = {};
    
    if (leido !== null && leido !== undefined && leido !== '') {
      where.leido = leido === 'true';
    }
    
    if (objetivo) {
      where.objetivo = objetivo;
    }

    const contactos = await prisma.contacto.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(contactos);
  } catch (error) {
    console.error('Error fetching contactos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los contactos' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar contacto (marcar como leído) (protegido)
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { id, leido } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'ID del contacto es requerido' },
        { status: 400 }
      );
    }

    const contacto = await prisma.contacto.update({
      where: { id },
      data: { leido: leido !== undefined ? leido : true }
    });

    return NextResponse.json(contacto);
  } catch (error) {
    console.error('Error updating contacto:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el contacto' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar contacto (protegido)
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID del contacto es requerido' },
        { status: 400 }
      );
    }

    await prisma.contacto.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Contacto eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting contacto:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el contacto' },
      { status: 500 }
    );
  }
}