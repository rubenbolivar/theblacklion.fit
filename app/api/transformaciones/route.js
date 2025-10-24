import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET - Obtener transformaciones visibles (público)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');

    const where = { visible: true };
    
    if (categoria && categoria !== 'todos') {
      where.categoria = categoria;
    }

    const transformaciones = await prisma.transformacion.findMany({
      where,
      orderBy: { orden: 'asc' }
    });

    return NextResponse.json(transformaciones);
  } catch (error) {
    console.error('Error fetching transformaciones:', error);
    return NextResponse.json(
      { error: 'Error al obtener las transformaciones' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva transformación (protegido)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const data = await request.json();

    const transformacion = await prisma.transformacion.create({
      data: {
        nombreCliente: data.nombreCliente,
        edad: data.edad ? parseInt(data.edad) : null,
        imagenAntes: data.imagenAntes,
        imagenDespues: data.imagenDespues,
        categoria: data.categoria,
        tiempoTransformacion: data.tiempoTransformacion,
        testimonial: data.testimonial,
        visible: data.visible !== undefined ? data.visible : true,
        orden: data.orden || 0
      }
    });

    return NextResponse.json(transformacion, { status: 201 });
  } catch (error) {
    console.error('Error creating transformacion:', error);
    return NextResponse.json(
      { error: 'Error al crear la transformación' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar transformación (protegido)
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
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de la transformación es requerido' },
        { status: 400 }
      );
    }

    const transformacion = await prisma.transformacion.update({
      where: { id },
      data: {
        ...updateData,
        edad: updateData.edad ? parseInt(updateData.edad) : undefined,
      }
    });

    return NextResponse.json(transformacion);
  } catch (error) {
    console.error('Error updating transformacion:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la transformación' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar transformación (protegido)
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
        { error: 'ID de la transformación es requerido' },
        { status: 400 }
      );
    }

    await prisma.transformacion.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Transformación eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting transformacion:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la transformación' },
      { status: 500 }
    );
  }
}